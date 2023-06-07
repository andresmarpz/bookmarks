export default async function SlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return <div>{slug}</div>
}
