export default function FoliageBackground() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: 'url(/images/foliage-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
      }}
    />
  )
}
