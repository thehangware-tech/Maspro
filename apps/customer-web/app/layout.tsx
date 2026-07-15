import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header
            style={{
              padding: "1rem",
              borderBottom: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>Maspro Sports</h1>
            <div>
              <SignInButton />
              <SignUpButton />

              <UserButton />
            </div>
          </header>
          <main style={{ padding: "1rem" }}>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
