<script lang='ts'>
  let pathAnimate1
  let pathAnimate2
  let pathUnanimate1
  let pathUnanimate2

  const togglePath = (over = false) => {
    if (over) {
      pathAnimate1.beginElement()
      pathAnimate2.beginElement()
    } else {
      pathUnanimate1.beginElement()
      pathUnanimate2.beginElement()
    }
  }
</script>

<button
  on:focus={() => togglePath(true)}
  on:blur={() => togglePath()}
  on:mouseenter={() => togglePath(true)}
  on:mouseleave={() => togglePath()}
  id='line1'>
  <svg class='line-1' width="100%" height="100%" viewBox="0 0 87 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M87.0005 0.000488281L4.57212 0C2.35096 0 0.5 1.78571 0.5 3.92857V10C23.6217 10 54.5481 10.0005 75.5245 10.0005C79.7817 10.0005 81.8178 8.21477 82.5582 6.60763L87.0005 0.000488281Z" fill="#08EBFC"/>
    <path d="
      M53.9765 39
      L0.499743 39
      L0.5 49
      H42.5005
      C46.7577 49 48.7938 47.2143 49.5342 45.6071
      L53.9765 39
      Z"
      fill="#08EBFC"
    >
      <animate
        bind:this={pathAnimate1}
        attributeName="d"
        begin="indefinite"
        to="
          M86.9765 39
          L0.499743 39
          L0.5 49
          H75.5005
          C79.7577 49 81.7938 47.2143 82.5342 45.6071
          L86.9765 39
          Z"
        dur="150ms"
        fill='freeze'
      />
      <animate
        bind:this={pathUnanimate1}
        attributeName="d"
        begin="indefinite"
        to="
          M53.9765 39
          L0.499743 39
          L0.5 49
          H42.5005
          C46.7577 49 48.7938 47.2143 49.5342 45.6071
          L53.9765 39
          Z"
        dur="125ms"
        fill='freeze'
      />
    </path>
    <path d="M77.4768 78L0.499743 78L0.5 88H66.0008C70.258 88 72.2942 86.2143 73.0345 84.6071L77.4768 78Z" fill="#08EBFC">
      <animate
        bind:this={pathAnimate2}
        attributeName="d"
        begin="indefinite"
        to="
          M86.4768 78
          L0.499743 78
          L0.5 88
          H75.0008
          C79.258 88 81.2942 86.2143 82.0345 84.6071
          L86.4768 78
          Z"
        dur="150ms"
        fill='freeze'
      />
      <animate
        bind:this={pathUnanimate2}
        attributeName="d"
        begin="indefinite"
        to="
          M77.4768 78
          L0.499743 78
          L0.5 88
          H66.0008
          C70.258 88 72.2942 86.2143 73.0345 84.6071
          L77.4768 78
          Z"
        dur="125ms"
        fill='freeze'
      />
    </path>
  </svg>

  <!-- <svg width="87" height="88" viewBox="0 0 87 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M87.0005 0.000488281L4.57212 0C2.35096 0 0.5 1.78571 0.5 3.92857V10C23.6217 10 54.5481 10.0005 75.5245 10.0005C79.7817 10.0005 81.8178 8.21477 82.5582 6.60763L87.0005 0.000488281Z" fill="#08EBFC"/>
    <path d="
      M53.9765 39
      L0.499743 39
      L0.5 49
      H42.5005
      C46.7577 49 48.7938 47.2143 49.5342 45.6071
      L53.9765 39
      Z" fill="#08EBFC"/>
    <path d="M77.4768 78L0.499743 78L0.5 88H66.0008C70.258 88 72.2942 86.2143 73.0345 84.6071L77.4768 78Z" fill="#08EBFC"/>
    </svg>     -->
</button>