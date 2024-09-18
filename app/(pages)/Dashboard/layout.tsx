type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div>
      <p>I am inside the DashboardLayout</p>
      {children}
      <p>I am inside the DashboardLayout</p>
    </div>
  );
}
