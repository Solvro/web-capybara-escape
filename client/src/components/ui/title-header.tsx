export function TitleHeader({ title }: { title: string }) {
  return (
    <h1 className="mb-4 text-4xl absolute top-15 left-0 font-bold w-full text-center arcade-font">
      {title}
    </h1>
  );
}
