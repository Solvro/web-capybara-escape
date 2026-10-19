export function IntroContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}
