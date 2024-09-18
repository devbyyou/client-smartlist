type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  return (
    <div>
      <p>I am inside the LoginLayout</p>
      {children}
      <p>I am inside the LoginLayout</p>
    </div>
  );
}
