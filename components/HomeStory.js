"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const tiles = [
  {
    image: "/images/story/feat1.jpg",
    title: "Milk system",
    body: "A SilkFoam carafe textures milk on one press. A steam wand is there when you want to finish the foam by hand.",
  },
  {
    image: "/images/story/feat2.jpg",
    title: "Variety of drinks",
    body: "Start with a few everyday cups, or open a menu that runs from espresso to cold coffee. Cambria also keeps two roasts ready.",
  },
  {
    image: "/images/story/feat3.jpg",
    title: "Simple controls",
    body: "Soft-touch icons on Nova Start. A color screen on Plus, Next, and Atelier, with size, strength, and saved profiles.",
  },
  {
    image: "/images/story/feat4.jpg",
    title: "One-press cleaning",
    body: "Rinse the milk path after a milk drink, empty the tray, and follow the descale prompt when the screen asks.",
  },
];

export default function HomeStory() {
  const recommended = ["nova-duo", "cambria-arctic", "nova-evo-foam"]
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean);

  return (
    <div className="story" id="guides">
      <section className="story-lead">
        <h2>What is a fully automatic coffee machine?</h2>
        <p>
          It grinds whole beans and brews espresso in one pass. On most Vela machines a carafe also textures the milk, so cappuccino, latte, and macchiato are a single press. You can still change strength and cup size, and cleaning is a rinse plus the descale prompt.
        </p>
      </section>

      <article className="side-card">
        <div className="side-photo">
          <img src="/images/story/worth.jpg" alt="Two Vela automatic machines on a counter" />
        </div>
        <div className="side-copy">
          <h2>Which coffee machine suits me best?</h2>
          <p>
            Nova is the easy start: a rich espresso or cappuccino without a lesson. Cambria is the one when two coffees share the kitchen. Vista Explore opens a wide hot-and-cold menu. Atelier Reserve is the flagship, with the longest set of controls.
          </p>
        </div>
      </article>

      <article className="side-card reverse">
        <div className="side-copy">
          <h2>Is it worth buying a fully automatic coffee machine?</h2>
          <p>
            If the weekday cup should just appear, yes. Beans are ground right before the shot, milk foam does not need a separate pitcher, and the same machine can pour a short espresso or a longer coffee. Care stays light: a rinse, and a descale when the machine asks.
          </p>
        </div>
        <div className="side-photo">
          <img src="/images/story/milk.jpg" alt="Automatic machine with hot and cold drinks" />
        </div>
      </article>

      <section className="looks">
        <div className="story-lead">
          <h2>What should I look for in a fully automatic coffee machine?</h2>
          <p>Design, milk, drink list, controls, or cleaning — or all of them. These are the four that change the cup.</p>
        </div>
        <div className="mosaic">
          {tiles.map((tile) => (
            <article key={tile.title}>
              <img src={tile.image} alt="" />
              <div>
                <h3>{tile.title}</h3>
                <p>{tile.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <article className="side-card reverse">
        <div className="side-copy">
          <h2>Which milk foaming system is best?</h2>
          <p>
            Choose the carafe when you want thick, even foam without standing at the machine. Choose the steam wand when you like finishing the milk yourself. Carafe models are marked automatic. Wand models are marked manual.
          </p>
        </div>
        <div className="side-photo">
          <img src="/images/story/suit.jpg" alt="Steam wand beside automatic milk foam" />
        </div>
      </article>

      <h2 className="rec-head">Recommended for you</h2>
      <div className="grid">
        {recommended.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </div>
  );
}
