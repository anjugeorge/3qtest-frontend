import React from "react";
import AboutUsHero from "./AboutUsHero";
const features = [
  {
    id: 1,
    title: "Personalized Reports",
    desc: "We don't just tell you what careers might suit you—we explain why, providing detailed insights into how your specific traits align with different professional environments.",
  },
  {
    id: 2,
    title: "Comprehensive Analysis",
    desc: "Our tests evaluate multiple dimensions of your personality, capturing the nuances that make you unique and matching them to career opportunities where you'll truly excel.",
  },
  {
    id: 3,
    title: "Tech-Powered Insights",
    desc: "We leverage advanced algorithms and data analysis to ensure our recommendations are precise and tailored to your individual profile.",
  },
];
const AboutUsPage = () => {
  return (
    <>
      <AboutUsHero />
      <div className="container">
        {" "}
        <div className="grid grid-cols-1 py-20">
          <h1 className="text-3xl font-roboto font-bold text-center">
            Our Mission
          </h1>
          <p className="font-roboto leading-7 py-5 px-5 text-start">
            At 3QTests, our mission is to empower individuals to make confident
            career decisions by providing them with deep insights into their
            unique personality traits and potential career matches. We believe
            that when people work in fields that align with their natural
            strengths and passions, they not only achieve greater personal
            satisfaction but also contribute more meaningfully to society.
            Through continuous research and innovation, we strive to make career
            assessment accessible, accurate, and actionable for everyone,
            regardless of their stage in life or professional background.
          </p>
          <p className="font-roboto leading-7 py-5 px-5 text-start">
            3QTests is a team of dedicated professionals who are passionate
            about helping others find the best career choices for them. Based in
            Canada, 3QTests provides accurate and insightful personality
            assessments that help people identify their unique strengths and
            weaknesses. With this information, individuals can make more
            informed decisions about their careers and future prospects.
          </p>
        </div>
      </div>

      <div className="bg-purple-50">
        <div className="container">
          <div className="flex flex-col items-center py-20">
            <h1 className="text-3xl font-roboto font-bold text-center">
              What Makes Us Different?
            </h1>
            <div
              className="py-5 grid md:grid-cols-3 grid-cols-1 gap-4"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              {features.map((content) => (
                <div className="flex flex-col bg-white shadow-sm  p-6 text-slate-800 hover:bg-purple-800 hover:text-white">
                  <div key={content.id} className="flex items-center mb-4">
                    <h5 className="  font-semibold text-sm/7">
                      {content.title}
                    </h5>
                  </div>
                  <p className="block  pb-3 text-sm/7">{content.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
