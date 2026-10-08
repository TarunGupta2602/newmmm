"use client";

import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/data/products";

const steps = [
  {
    key: "menu",
    question: "How big a drink list do you want?",
    options: [
      { id: "few", label: "A few everyday cups" },
      { id: "many", label: "A fuller menu" },
      { id: "most", label: "As many as possible" },
    ],
  },
  {
    key: "milk",
    question: "How do you want the milk done?",
    options: [
      { id: "auto", label: "Automatic foam" },
      { id: "wand", label: "I will use a steam wand" },
      { id: "both", label: "Hot and cold foam" },
    ],
  },
  {
    key: "beans",
    question: "Do two coffees live in the house?",
    options: [
      { id: "one", label: "One roast is enough" },
      { id: "two", label: "I switch beans often" },
    ],
  },
];

function recommend(answers) {
  if (answers.beans === "two") return "cambria-onyx";
  if (answers.menu === "most") return "vista-explore";
  if (answers.milk === "both") return "nova-duo";
  if (answers.milk === "wand") return "nova-evo-steam";
  if (answers.menu === "few") return "nova-start-silver";
  return "atelier-reserve";
}

export default function ChoosePage() {
  const [answers, setAnswers] = useState({});
  const done = steps.every((step) => answers[step.key]);
  const pick = done ? getProduct(recommend(answers)) : null;

  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>Help me choose</h1>
        <p className="lede">Three questions. You get one machine from the automatic range.</p>
        <div className="quiz">
          {steps.map((step) => (
            <div key={step.key}>
              <h2 style={{ fontSize: 20 }}>{step.question}</h2>
              <div className="quiz-options">
                {step.options.map((option) => (
                  <button
                    key={option.id}
                    className={answers[step.key] === option.id ? "line-btn on" : "line-btn"}
                    onClick={() => setAnswers({ ...answers, [step.key]: option.id })}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {pick && (
          <div className="panel" style={{ marginTop: 24 }}>
            <img src={pick.image} alt="" style={{ width: 180, margin: "0 auto" }} />
            <h2>{pick.name}</h2>
            <p>{pick.description}</p>
            <Link className="solid" href={`/product/${pick.slug}`} style={{ display: "inline-block" }}>View this machine</Link>
          </div>
        )}
      </div>
    </div>
  );
}
