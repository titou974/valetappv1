export default function ClientLayout({ children, isVisible }) {
    return (
        isVisible && (
            <div className="bg-background text-foreground h-screen">
                {children}
            </div>
        )
    )
  }
  