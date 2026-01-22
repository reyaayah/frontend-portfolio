import { getGithubStats } from "../../lib/getGithubStats";
import GithubStatusCard from "./GithubStatus";

export default async function GithubStatusWrapper() {
  const stats = await getGithubStats("reyaayah");

  return <GithubStatusCard stats={stats} />;
}
