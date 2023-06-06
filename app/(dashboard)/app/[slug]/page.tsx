export default function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  return <div>{slug}</div>
}
