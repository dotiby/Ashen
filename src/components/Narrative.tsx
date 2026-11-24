import { TOKEN } from "../config";

export function Narrative() {
  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="container story__grid">
        <div className="story__aside">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            The story
          </p>
          <p className="story__index" aria-hidden="true">
            No. 02
          </p>
        </div>

        <div className="story__body">
          <h2 id="story-title" className="story__lead">
            Most lights follow the one ahead.
          </h2>
          <p>
            In the long procession of hooded figures moving through darkness, the line has
            always known where to go: forward, behind the next light. Ashen is the moment
            one of those lights stops following.
          </p>
          <p>
            It carries no instructions beyond the moment it was lit. On GIWA Sepolia it
            trades as an ownerless token that can graduate to an Ammora pool. The light
            does not promise direction. It only continues.
          </p>
          <blockquote className="story__quote">
            <p>{TOKEN.tagline}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
