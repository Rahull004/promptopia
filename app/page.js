import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className=" w-full flex-center flex-col">
      <h1 className=" head_text text-center">Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient">
        AI-Powered Prompts
      </span>
       </h1>
      <p className="desc text-center">
        Promtopia is a community-driven platform or an open-source AI promting tool, used for discovering and sharing AI-generated prompts.
      </p>
      <Feed />
    </section>
  );
}
