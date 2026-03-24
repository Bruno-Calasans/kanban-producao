interface ContentContainerProps {
    children: React.ReactNode
}

export default function ContentContainer({ children }: ContentContainerProps) {
    return (
        <main className="max-w-5xl mx-auto px-4 py-8 flex-1">
            {children}
        </main>
    )
}
