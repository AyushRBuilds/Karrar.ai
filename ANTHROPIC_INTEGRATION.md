# Anthropic Claude API Integration

## Overview
Karrar.ai is now fully integrated with Anthropic's Claude 3.5 Sonnet model for real-time, multi-agent contract analysis grounded in Indian law.

## Architecture

### Server-Side Processing
- **File**: `app/actions/analyzeContract.ts`
- **Function**: `analyzeContractAction(fileBase64, fileName)`
- **Type**: Next.js Server Action
- **Security**: Anthropic API key stored server-side only, never exposed to client

### Client-Side Trigger
- **File**: `components/ui/UploadZone.tsx`
- **Flow**: 
  1. User uploads PDF via drag-drop or file select
  2. File converted to base64 on client
  3. Server action called with base64 + filename
  4. Server processes with Anthropic API
  5. Result returned to client and saved to localStorage

### Environment Configuration
```bash
ANTHROPIC_API_KEY=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
```
Set in Vercel project settings or `.env.local` for local development.

## API Request Structure

### System Prompt
The system prompt directs Claude to:
1. Analyze contracts through 6 agent lenses (Risk, Completeness, Negotiation, Consistency, Regulatory, Explanation)
2. Ground all findings in Indian Contract Act 1872, DPDP Act 2023, Indian Arbitration Act 1996
3. Identify liability risks, non-compete reasonableness, data protection gaps
4. Return ONLY valid JSON (no markdown)

### Request Payload
```javascript
{
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 4096,
  system: systemPrompt,
  messages: [{
    role: 'user',
    content: [
      {
        type: 'document',
        source: {
          type: 'base64',
          media_type: 'application/pdf',
          data: base64EncodedPDF
        }
      },
      {
        type: 'text',
        text: 'Please analyze this PDF contract according to the system instructions.'
      }
    ]
  }]
}
```

## Response Structure

### Main Analysis Object
```typescript
{
  fileName: string                          // Original filename
  overallScore: number (0-10)              // Overall risk score
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  completenessScore: number (0-100)        // How complete the contract is
  clauses: [{                              // Array of identified clauses
    id: number
    title: string                          // Clause name
    type: string                           // Category (Liability, Employment, etc)
    riskScore: number (0-100)              // Individual risk score
    riskLevel: string                      // Risk category
    agent: string                          // Which agent identified this
    negotiable: boolean                    // Can be negotiated
    confidence: number (0-100)             // Claude's confidence %
    original: string                       // Exact clause text from PDF
    plain: string                          // Plain English explanation
    counter: string                        // Suggested counter-term
    financialExposure: string              // Rupee amount at risk
    regulatoryNote: string | null          // Relevant Indian law
  }]
  agentOutputs: {                          // Per-agent analysis
    completeness: { score, status, missing[], present[] }
    risk: { score, critical, high, medium, low, topRisk }
    negotiation: { counterTermsGenerated, strategy, mostLeverageClause }
    consistency: { contradictions, issues[] }
    regulatory: { complianceScore, violations[], jurisdiction }
    explanation: { readabilityScore, grade, summary }
  }
}
```

## Error Handling

### API Failure Fallback
If Anthropic API is unavailable or returns error:
1. Server action throws error
2. Client catches error and shows toast: "Analysis failed. Please try again."
3. User can retry upload
4. No mock data is returned (ensures real analysis)

### Invalid Response Handling
- If Claude returns non-JSON: Parse error caught, user prompted to retry
- If JSON missing required fields: Validation passes through (trust Claude structure)
- If base64 encoding fails: Caught before API call

## Usage in Components

### UploadZone Component
```typescript
const buffer = await file.arrayBuffer()
const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
const analysis = await analyzeContractAction(base64, file.name)

// Save to localStorage
const history = JSON.parse(localStorage.getItem('contracts-history') || '[]')
history.unshift({
  id: Date.now().toString(),
  fileName: file.name,
  uploadDate: new Date().toISOString(),
  overallScore: analysis.overallScore,
  riskLevel: analysis.riskLevel,
  clausesCount: analysis.clauses.length,
  analysisSnapshot: analysis
})
localStorage.setItem('contracts-history', JSON.stringify(history.slice(0, 50)))
```

### Report Page Usage
The analysis result flows to:
- `AgentResults.tsx` - Shows per-agent findings
- `RiskVisualization.tsx` - Charts and risk gauges
- `CounterTerms.tsx` - Negotiation suggestions
- `ConsistencyReport.tsx` - Clause conflicts
- `PlainLanguageSummary.tsx` - Executive summary

## Testing

### Local Development
1. Add `ANTHROPIC_API_KEY` to `.env.local`
2. Run `npm run dev`
3. Upload PDF in `/dashboard` page
4. Check console for "[v0]" debug logs

### Production Deployment
1. Set `ANTHROPIC_API_KEY` in Vercel Environment Variables
2. Deploy to Vercel
3. API key automatically injected at runtime
4. All requests go through Next.js server

## Troubleshooting

### "No Anthropic API key found" Error
- Check Vercel Environment Variables (not NEXT_PUBLIC_* versions)
- Ensure key starts with `sk-ant-api03-`
- Restart dev server after adding .env.local

### Timeout or Slow Requests
- Claude PDF analysis can take 5-15 seconds
- UI shows progress: "Parsing PDF... Risk Analysis... Synthesizing Results..."
- Increase `max_tokens` if responses are truncated

### Invalid JSON Response
- Claude sometimes includes markdown code blocks
- Server action strips `\`\`\`json ... \`\`\`` wrapper
- If still failing, Claude may need more explicit instruction in system prompt

## Performance Metrics

| Metric | Value |
|--------|-------|
| Average Analysis Time | 5-10 seconds |
| Max Tokens | 4096 |
| Model | claude-3-5-sonnet-20241022 |
| Cost (est.) | ~$0.10-0.30 per analysis |

## Next Steps

1. **Monitor Usage**: Track analyses per user for billing
2. **Cache Results**: Store analysis results in database, not just localStorage
3. **Batch Processing**: Queue multiple analyses for faster throughput
4. **Custom Instructions**: Adjust system prompt for specific industries/jurisdictions
5. **Streaming**: Add real-time streaming for long analyses using Server-Sent Events

## Files Changed

- ✅ `package.json` - Added `@anthropic-ai/sdk`
- ✅ `app/actions/analyzeContract.ts` - Server action with Claude API call
- ✅ `components/ui/UploadZone.tsx` - Updated to use server action
- ✅ `lib/api.ts` - Uses `ANTHROPIC_API_KEY` (not `NEXT_PUBLIC_*`)

## Support

For issues or questions:
- Check Anthropic documentation: https://docs.anthropic.com/
- Review API status: https://status.anthropic.com/
- Enable debug logs: Add `console.log("[v0]", ...)` in server action
