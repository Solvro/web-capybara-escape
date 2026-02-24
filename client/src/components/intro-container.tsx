export function IntroContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-120 flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}
