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
          background: 'none',
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
<g clip-path="url(#clip0_28_57)">
<g filter="url(#filter0_i_28_57)">
<rect width="1024" height="1024" fill="#E9FAFF"/>
</g>
<g filter="url(#filter1_f_28_57)">
<path d="M625.938 228C845.712 228 1023.88 406.163 1023.88 625.938C1023.88 845.712 845.712 1023.88 625.938 1023.88C406.163 1023.88 228 845.712 228 625.938C228 406.163 406.163 228 625.938 228Z" fill="url(#paint0_linear_28_57)"/>
</g>
</g>
<defs>
<filter id="filter0_i_28_57" x="0" y="0" width="1024" height="1024" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="146" operator="erode" in="SourceAlpha" result="effect1_innerShadow_28_57"/>
<feOffset/>
<feGaussianBlur stdDeviation="125"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.395314 0 0 0 0 0.822852 0 0 0 0 0.772972 0 0 0 0.8 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_28_57"/>
</filter>
<filter id="filter1_f_28_57" x="14.3" y="14.3" width="1223.27" height="1223.27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="106.85" result="effect1_foregroundBlur_28_57"/>
</filter>
<linearGradient id="paint0_linear_28_57" x1="407.75" y1="442.796" x2="980.916" y2="1143.71" gradientUnits="userSpaceOnUse">
<stop stop-color="#5DE7E7"/>
<stop offset="1" stop-color="#001AFF"/>
</linearGradient>
<clipPath id="clip0_28_57">
<rect width="1024" height="1024" fill="white"/>
</clipPath>
</defs>
</svg>


      </div>
    ),
    {
      ...size,
    }
  )
}