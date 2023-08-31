import FrontPage from "./FrontPage";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <div className=" h-16 ">
        <FrontPage >{children}</FrontPage>
      </div>
    </>
  );
}
