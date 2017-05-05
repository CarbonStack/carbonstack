const color = '#626262'

const Logo = (props) => {
  const { size, monochrom } = props

  const outerCoors = getHexagonCoor(200)
  const innerCoors = getHexagonCoor(170)

  if (monochrom) {
    return <svg height={size} width={size} viewBox='0 0 500 500'>
      <path d={getDByCoor([...innerCoors, ...outerCoors.reverse()])} fill='#626262' />
      <path d={getDByCoor([
        innerCoors[3],
        [250, 250]
      ])} stroke={color} strokeWidth='10' fill='none' />
      <path d={getDByCoor([
        innerCoors[5],
        [250, 250]
      ])} stroke={color} strokeWidth='10' fill='none' />
      <path d={getDByCoor([
        innerCoors[1],
        [250, 250]
      ])} stroke={color} strokeWidth='10' fill='none' />
    </svg>
  }

  const innerLeftCoors = [
    innerCoors[5],
    innerCoors[4],
    innerCoors[3],
    [250, 250]
  ]
  const innerRightCoors = [
    innerCoors[3],
    innerCoors[2],
    innerCoors[1],
    [250, 250]
  ]

  return <svg height={size} width={size} viewBox='0 0 500 500'>
    <path d={getDByCoor(outerCoors)} fill={color} />
    <path d={getDByCoor(innerCoors)} fill='#FFFFFF' />
    <path d={getDByCoor(innerLeftCoors)} fill='#E7E7E7' /><path d={getDByCoor(innerRightCoors)} fill='#CACACA' />
  </svg>
}

export default Logo

function getHexagonCoor (radius) {
  const arr = []
  for (let i = 0; i < 7; i++) {
    const x = 250 + Math.sin(Math.PI * i / 3) * radius
    const y = 250 - Math.cos(Math.PI * i / 3) * radius
    arr.push([x, y])
  }
  return arr
}

function getDByCoor (arr) {
  return `M${arr.map(coor => coor.join(' ')).join(' L ')} Z`
}
