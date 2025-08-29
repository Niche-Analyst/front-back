// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ORB AI. All rights reserved.
      </div>
    </footer>
  );
}
