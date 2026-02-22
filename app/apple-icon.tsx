import { ImageResponse } from 'next/og'

export const size = {
  width: 1024,
  height: 1024,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#E9FAFF',
          boxShadow: 'inset 0 0 200px #65D2C5',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          
        }}
      >
        <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_0_1)">
          <path d="M397.938 0C617.712 0 795.875 178.163 795.875 397.938C795.875 617.712 617.712 795.875 397.938 795.875C178.163 795.875 0 617.712 0 397.938C0 178.163 178.163 0 397.938 0Z" fill="url(#paint0_linear_0_1)"/>
          </g>
          <path d="M734.499 296.001H960V896.001H1024V1024H384V896.001H474C474 896.001 562.067 794.831 540 680.001C513 539.501 576 296 576 296H734.5L734.499 296.001ZM680.535 424.001C656.673 500.6 639.215 602.116 665 701.501C694.365 814.685 658.5 896.001 658.5 896.001H832V424.001H680.535Z" fill="url(#paint1_linear_0_1)"/>
          <defs>
          <filter id="filter0_f_0_1" x="-213.7" y="-213.7" width="1223.27" height="1223.27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="106.85" result="effect1_foregroundBlur_0_1"/>
          </filter>
          <linearGradient id="paint0_linear_0_1" x1="179.75" y1="214.796" x2="752.916" y2="915.708" gradientUnits="userSpaceOnUse">
          <stop stop-color="#5DE7E7"/>
          <stop offset="1" stop-color="#001AFF"/>
          </linearGradient>
          <linearGradient id="paint1_linear_0_1" x1="704" y1="296" x2="704" y2="1024" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0E0C56"/>
          <stop offset="1" stop-color="#105067"/>
          </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}