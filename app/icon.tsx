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
          background: 'linear-gradient(149deg, rgba(55,0,255,1) 40%, rgba(213,5,255,1) 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_28_44)">
<g filter="url(#filter0_i_28_44)">
<rect width="80" height="80" fill="url(#paint0_linear_28_44)"/>
</g>
<g filter="url(#filter1_f_28_44)">
<path d="M45.625 25C60.8128 25 73.125 37.3122 73.125 52.5C73.125 67.6878 60.8128 80 45.625 80C30.4372 80 18.125 67.6878 18.125 52.5C18.125 37.3122 30.4372 25 45.625 25Z" fill="url(#paint1_linear_28_44)"/>
</g>
</g>
<defs>
<filter id="filter0_i_28_44" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="3.125" operator="erode" in="SourceAlpha" result="effect1_innerShadow_28_44"/>
<feOffset/>
<feGaussianBlur stdDeviation="19.5312"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.395314 0 0 0 0 0.822852 0 0 0 0 0.772972 0 0 0 0.8 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_28_44"/>
</filter>
<filter id="filter1_f_28_44" x="2.5" y="9.375" width="86.25" height="86.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="7.8125" result="effect1_foregroundBlur_28_44"/>
</filter>
<linearGradient id="paint0_linear_28_44" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
<stop stop-color="#E9FAFF"/>
<stop offset="1" stop-color="#CCECF1"/>
</linearGradient>
<linearGradient id="paint1_linear_28_44" x1="30.5469" y1="39.8438" x2="70.1562" y2="88.2813" gradientUnits="userSpaceOnUse">
<stop stop-color="#5DE7E7"/>
<stop offset="1" stop-color="#001AFF"/>
</linearGradient>
<clipPath id="clip0_28_44">
<rect width="80" height="80" fill="white"/>
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