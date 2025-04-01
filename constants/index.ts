export const movies = [
  {
    id: 2141324123,
    name: "Empuraan",
    desc: "L2: Empuraan is a 2025 Indian Malayalam-language action thriller film directed by Prithviraj Sukumaran and written by Murali Gopy.",
    imageSrc: "https://pbs.twimg.com/media/GiYMnHgaYAAW58y.jpg",
  },
  {
    id: 1356451616,
    name: "Lucifer",
    desc: "A major power struggle occurs when the leader of a political party passes away. In the midst of the chaos, a mysterious man named Stephen steps in to ascend the throne.",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw3AKr8zyfKD-1QRh38kq7evzgEjwOwGwVUA&s",
  },
  {
    id: 65146843521,
    name: "Chaava",
    desc: `Shivaji's death sparks the Maratha-Mughal conflict. His son Sambhaji leads resistance against Aurangzeb's forces. Amid battles and intrigue, both sides face challenges in a struggle for power.`,
    imageSrc:
      "https://m.media-amazon.com/images/M/MV5BMDMyZjFmZTctNDAxYi00MWM3LWJiYmItM2VhNWZiM2IwNjNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 351161651,
    name: "Ponman",
    desc: `Gold dealer Ajesh lends precious sovereigns for a village wedding, but finds himself in danger when the bride's criminal husband schemes to keep the gold and silence him forever.`,
    imageSrc:
      "https://m.media-amazon.com/images/M/MV5BNGYxOGI5ZmYtNGM1Zi00OTI1LTg3NTMtOGQ0ZjJmNTdkNmY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 315843215,
    name: "Painkili",
    desc: "Suku pretends to be insane to evade legal consequences. During his act of feigning mental illness, he falls in love unexpectedly.",
    imageSrc:
      "https://m.media-amazon.com/images/M/MV5BNmZhZmQ4MDAtMjY1ZS00OTI4LWFkOWUtOTZiZTk0MjNlMzVkXkEyXkFqcGc@._V1_.jpg",
  },
];

export const cnfrmalrtOptionsFn = ({ title, message, label1, label2 }: ConfirmationOptions) => {
  const options = {
    title: title || "Title",
    message: message || "Message",
    buttons: [
      {
        label: label1 || "Yes",
        onClick: () => alert("Click Yes"),
      },
      {
        label: label2 || "No",
        onClick: () => alert("Click No"),
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };
  return options;
};
