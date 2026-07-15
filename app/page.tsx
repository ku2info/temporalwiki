import { AtlasBoard } from "@/src/components/AtlasBoard";
import { sampleAtlas } from "@/src/domain/sample-data";

export default function Home() {
  return <AtlasBoard atlas={sampleAtlas} />;
}
