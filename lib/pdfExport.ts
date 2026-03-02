import { AnalysisResult } from './api'

declare const jsPDF: any

export async function exportReportPDF(analysis: AnalysisResult) {
  // Load jsPDF from CDN if not already loaded
  if (typeof window !== 'undefined' && !window.jsPDF) {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    script.onload = () => {
      generatePDF(analysis)
    }
    document.head.appendChild(script)
  } else {
    generatePDF(analysis)
  }
}

function generatePDF(analysis: AnalysisResult) {
  const { jsPDF } = window
  const doc = new jsPDF()

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper function to add text and manage pagination
  const addText = (text: string, options: any = {}) => {
    const { fontSize = 12, fontStyle = 'normal', align = 'left' } = options
    doc.setFontSize(fontSize)
    doc.setFont(undefined, fontStyle)

    const lines = doc.splitTextToSize(text, contentWidth)
    const lineHeight = fontSize * 0.35

    if (yPosition + lines.length * lineHeight > pageHeight - 10) {
      doc.addPage()
      yPosition = margin
    }

    doc.text(lines, margin, yPosition, { align, maxWidth: contentWidth })
    yPosition += lines.length * lineHeight + 5
  }

  // Header
  addText('KARRAR.AI - Contract Intelligence Report', { fontSize: 20, fontStyle: 'bold' })
  addText(`${analysis.fileName} • Generated ${new Date().toLocaleDateString()}`, { fontSize: 10 })
  yPosition += 5

  // Overall Score Section
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, yPosition, contentWidth, 35, 'F')
  doc.setFontSize(16)
  doc.setFont(undefined, 'bold')
  doc.text(`Overall Risk Score: ${analysis.overallScore.toFixed(1)}/10`, margin + 10, yPosition + 12)
  doc.setFontSize(11)
  doc.setFont(undefined, 'normal')
  doc.text(`Risk Level: ${analysis.riskLevel}`, margin + 10, yPosition + 22)
  doc.text(`Completeness: ${analysis.completenessScore}%`, margin + 10, yPosition + 30)
  yPosition += 45

  // Executive Summary
  addText('Executive Summary', { fontSize: 14, fontStyle: 'bold' })
  const summary = `This contract has been analyzed using AI-powered legal intelligence. A total of ${analysis.clauses.length} clauses were identified and assessed. ${analysis.riskLevel === 'Critical' ? 'CRITICAL: ' : ''}The contract contains ${analysis.agentOutputs.risk.high} high-risk and ${analysis.agentOutputs.risk.critical} critical clauses that require immediate attention.`
  addText(summary)
  yPosition += 5

  // Key Findings
  addText('Key Findings', { fontSize: 14, fontStyle: 'bold' })
  addText(`• ${analysis.agentOutputs.risk.topRisk}`)
  addText(`• ${analysis.agentOutputs.consistency.contradictions} contradictions found between clauses`)
  addText(`• ${analysis.agentOutputs.completeness.missing.length} critical documents missing`)
  addText(`• Regulatory Compliance Score: ${analysis.agentOutputs.regulatory.complianceScore}%`)
  yPosition += 10

  // Clauses Detail
  addText('Detailed Clause Analysis', { fontSize: 14, fontStyle: 'bold' })

  analysis.clauses.forEach((clause, idx) => {
    // Clause Header
    doc.setFillColor(245, 240, 232)
    doc.rect(margin, yPosition, contentWidth, 8, 'F')
    doc.setFontSize(11)
    doc.setFont(undefined, 'bold')
    doc.text(`${idx + 1}. ${clause.title}`, margin + 5, yPosition + 6)
    yPosition += 12

    // Clause Details
    doc.setFont(undefined, 'normal')
    doc.setFontSize(9)
    doc.text(`Risk Score: ${clause.riskScore}/100 | Level: ${clause.riskLevel} | Type: ${clause.type}`, margin + 5, yPosition)
    yPosition += 6

    // Original Text
    doc.setFont(undefined, 'bold')
    doc.setFontSize(9)
    doc.text('Original:', margin + 5, yPosition)
    yPosition += 4
    doc.setFont(undefined, 'normal')
    doc.setFontSize(8)
    const originalLines = doc.splitTextToSize(clause.original, contentWidth - 10)
    doc.text(originalLines, margin + 10, yPosition)
    yPosition += originalLines.length * 3.5 + 4

    // Plain Language
    doc.setFont(undefined, 'bold')
    doc.setFontSize(9)
    doc.text('In Plain English:', margin + 5, yPosition)
    yPosition += 4
    doc.setFont(undefined, 'normal')
    doc.setFontSize(8)
    const plainLines = doc.splitTextToSize(clause.plain, contentWidth - 10)
    doc.text(plainLines, margin + 10, yPosition)
    yPosition += plainLines.length * 3.5 + 4

    // Counter-Term (if negotiable)
    if (clause.negotiable && clause.counter) {
      doc.setFont(undefined, 'bold')
      doc.setFontSize(9)
      doc.text('Suggested Counter-Term:', margin + 5, yPosition)
      yPosition += 4
      doc.setFont(undefined, 'normal')
      doc.setFontSize(8)
      const counterLines = doc.splitTextToSize(clause.counter, contentWidth - 10)
      doc.text(counterLines, margin + 10, yPosition)
      yPosition += counterLines.length * 3.5
    }

    // Financial Exposure
    if (clause.financialExposure) {
      doc.setFont(undefined, 'bold')
      doc.setFontSize(8)
      doc.text(`Financial Exposure: ${clause.financialExposure}`, margin + 5, yPosition)
      yPosition += 5
    }

    yPosition += 8

    // Check for page break
    if (yPosition > pageHeight - 20) {
      doc.addPage()
      yPosition = margin
    }
  })

  // Regulatory Section
  yPosition += 5
  if (yPosition > pageHeight - 40) {
    doc.addPage()
    yPosition = margin
  }

  addText('Regulatory Compliance Assessment', { fontSize: 14, fontStyle: 'bold' })
  addText(`Compliance Score: ${analysis.agentOutputs.regulatory.complianceScore}%`)
  addText(`Jurisdiction: ${analysis.agentOutputs.regulatory.jurisdiction}`)

  if (analysis.agentOutputs.regulatory.violations.length > 0) {
    addText('Violations Found:', { fontStyle: 'bold' })
    analysis.agentOutputs.regulatory.violations.forEach(violation => {
      addText(`• ${violation}`)
    })
  }

  // Footer Disclaimer
  yPosition += 10
  doc.setFontSize(7)
  doc.setFont(undefined, 'normal')
  doc.setTextColor(100, 100, 100)
  const disclaimer =
    'DISCLAIMER: This report is generated using AI and does not constitute legal advice. Karrar.ai is not a law firm. All findings should be verified by a licensed advocate before making binding decisions. The analysis is based on Indian law but may not reflect the most recent amendments. Use only for informational purposes.'
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth)
  doc.text(disclaimerLines, margin, pageHeight - 15)

  // Save PDF
  doc.save(`Karrar-Report-${analysis.fileName.replace('.pdf', '')}-${new Date().toISOString().split('T')[0]}.pdf`)
}
