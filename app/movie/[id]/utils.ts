import { Movie } from "@/lib/store/slices/movies/types";

export const dummyMovie = {
  poster: null as unknown as string,
  _id: "",
  name: "",
  plot: "",
  year: "",
  producer: { name: "" },
  actors: [],
} as unknown as Movie;

type getConfirmAlertPropTypes = {
  movie: Movie;
  handleClickDelete: () => void;
};

export const getConfirmAlertProps = ({ movie, handleClickDelete }: getConfirmAlertPropTypes) => {
  return {
    title: `Delete ${movie?.name}`,
    message: "Are you sure you want to delete this?",
    buttons: [
      {
        label: "Yes",
        onClick: () => handleClickDelete(),
      },
      {
        label: "No",
      },
    ],
  };
};
