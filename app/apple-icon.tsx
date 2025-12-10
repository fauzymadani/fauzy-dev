import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 180,
    height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#18181B',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                    {/* < symbol */}
                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    {/* > symbol */}
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round" transform="translate(24, 0) scale(-1, 1)"/>
                    {/* / symbol */}
                    <path d="M13 4L11 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}

