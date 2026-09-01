export function ErrorContainer({ errorMessage }: { errorMessage: string }) {
  return <div className="my-4 text-xs text-red-400">{errorMessage}</div>;
}
