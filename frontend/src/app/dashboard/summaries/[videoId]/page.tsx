interface ParamsProps {
  params: {
    videoId: string;
  };
}

export default async function SummaryCardRoute(props: Readonly<ParamsProps>) {
  const params = await props?.params;
  const { videoId } = params;
  return <p>Summary card with go here: {videoId}</p>;
}
