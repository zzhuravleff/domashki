import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#E9FAFF',
          boxShadow: 'inset 0 0 30px #65D2C5',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_0_1)">
          <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0Z" fill="url(#paint0_linear_0_1)"/>
          </g>
          <path d="M29.5996 5V27.5H32V32.2998H8V27.5H11.375C11.3826 27.4912 14.676 23.7014 13.8496 19.4004C12.8371 14.1317 15.2002 5 15.2002 5H29.5996ZM19.1201 9.7998C18.2253 12.6722 17.5703 16.4791 18.5371 20.2061C19.6348 24.4368 18.3025 27.4805 18.2939 27.5H24.7998V9.7998H19.1201Z" fill="url(#paint1_linear_0_1)"/>
          <defs>
          <filter id="filter0_f_0_1" x="-4" y="-4" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_0_1"/>
          </filter>
          <linearGradient id="paint0_linear_0_1" x1="4.51705" y1="5.39773" x2="18.9205" y2="23.0114" gradientUnits="userSpaceOnUse">
          <stop stop-color="#5DE7E7"/>
          <stop offset="1" stop-color="#001AFF"/>
          </linearGradient>
          <linearGradient id="paint1_linear_0_1" x1="20" y1="5" x2="20" y2="32.2998" gradientUnits="userSpaceOnUse">
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