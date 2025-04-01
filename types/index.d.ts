declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type ConfirmationOptions = {
  title: string;
  message: string;
  label1: string;
  label2: string;
};
