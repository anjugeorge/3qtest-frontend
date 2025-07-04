export const radioOptions = (selectedValue) => [
  {
    id: 1,
    title: "Strongly Disagree",
    value: "stronglyDisagree",
    class: `flex flex-col  my-auto  mx-auto  cursor-pointer rounded-full w-20 h-20  border-4 border-[#898AC4]  items-center justify-center`,
    icon: `${
      selectedValue === "stronglyDisagree" ? "bg-[#898AC4]" : "bg-white"
    }`,
  },
  {
    id: 2,
    title: "Disagree",
    value: "disagree",
    class: `flex flex-col  my-auto  mx-auto   cursor-pointer rounded-full w-16 h-16  border-4 border-[#898AC4]   items-center justify-center`,
    icon: `${selectedValue === "disagree" ? "bg-[#898AC4]" : "bg-white"}`,
  },
  {
    id: 3,
    title: "Neutral",
    value: "neutral",
    class: `flex flex-col  my-auto  mx-auto  cursor-pointer rounded-full w-10 h-10  border-4 border-[#A6AEBF]   items-center justify-center`,
    icon: `${selectedValue === "neutral" ? "bg-[#A6AEBF]" : "bg-white"}`,
  },
  {
    id: 4,
    title: "Agree",
    value: "agree",
    class: `flex flex-col  my-auto  mx-auto   cursor-pointer rounded-full w-16 h-16  border-4 border-[#819A91]   items-center justify-center`,
    icon: `${selectedValue === "agree" ? "bg-[#819A91]" : "bg-white"}`,
  },
  {
    id: 5,
    title: "Strongly Agree",
    value: "stronglyAgree",
    class: `flex flex-col  my-auto  mx-auto  text-slate-800 cursor-pointer rounded-full w-20 h-20  border-4 border-[#819A91] hover:bg-blueviolet  items-center justify-center`,

    icon: `${selectedValue === "stronglyAgree" ? "bg-[#819A91]" : "bg-white"}`,
  },
];
