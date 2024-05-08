import * as React from "react"
import SvgIcon from "@mui/material/SvgIcon"

export default function SvgIconPiramide() {
  return (
    <SvgIcon sx={{ color: "white !important" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={24}>
        <defs>
          <clipPath id="a">
            <path d="M6 10h13v7H6Zm0 0" />
          </clipPath>
          <clipPath id="b">
            <path d="m6.867 13.527 5.153 2.95.007.003.024.016c.172.09.36.137.543.133.183.004.37-.043.543-.133l4.636-2.656c.168-.102.301-.242.395-.402l-5.574-3.192Zm0 0" />
          </clipPath>
          <linearGradient
            id="c"
            x1={-167.354}
            x2={-166.701}
            y1={435.652}
            y2={435.652}
            gradientTransform="matrix(13.02365 -7.45926 -7.51942 -12.91946 5463.644 4395.927)"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset={0}
              style={{
                stopColor: "#bfc0c1",
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#808183",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
        </defs>
        <path
          d="M1.297 3.777c-.094.16-.149.34-.156.54l.004 19.046 5.148-2.949.031-.016a1.2 1.2 0 0 0 .39-.402c.095-.16.15-.344.153-.539V6.969Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#e39b30",
            fillOpacity: 1,
          }}
        />
        <path
          d="M18.164 13.438c.094-.16.148-.344.152-.54l.004-5.304a1.154 1.154 0 0 0-.156-.54l-5.57 3.192Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#a32531",
            fillOpacity: 1,
          }}
        />
        <path
          d="M6.867.586c-.183 0-.37.043-.543.137L1.691 3.375c-.171.105-.3.242-.394.402l5.57 3.192Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#d35b2b",
            fillOpacity: 1,
          }}
        />
        <path
          d="M18.164 7.055a1.071 1.071 0 0 0-.394-.399l-5.176-2.965L7.414.723a1.136 1.136 0 0 0-.547-.137v6.383l5.727 3.277Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#cc2229",
            fillOpacity: 1,
          }}
        />
        <g clipPath="url(#a)">
          <g clipPath="url(#b)">
            <path
              d="m4.082 11.844 11.258-6.45 5.613 9.641-11.262 6.45Zm0 0"
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "url(#c)",
              }}
            />
          </g>
        </g>
      </svg>
    </SvgIcon>
  )
}
