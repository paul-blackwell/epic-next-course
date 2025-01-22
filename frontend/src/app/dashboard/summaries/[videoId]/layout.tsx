import { extractYouTubeID } from '@/lib/utils';
import { getSummaryById } from '@/data/loaders';
import YouTubePlayer from '@/components/custom/youtube-player';

export default async function SummarySingleRoute(props: {
  readonly params: Promise<any>;
  readonly children: React.ReactNode;
}) {
  const params = await props.params;

  const { children } = props;

  const data = await getSummaryById(params.videoId);
  if (data?.error?.status === 404) return <p>Summary not found</p>;

  console.log(data);
  const videoId = extractYouTubeID(data.videoUrl) || '';

  return (
    <div>
      <div className="h-full grid gap-4 grid-cols-5 p-4">
        <div className="col-span-3">{children}</div>
        <div className="col-span-2">
          <div>
            <YouTubePlayer videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}
