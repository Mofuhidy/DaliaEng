export const metadata = {
  title: "Sanity Studio",
  description: "Dalia Interior Portfolio CMS",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
