

export default function Container ({children } : { children : React.ReactNode }) {

    return <div className="w-full flex max-w-4xl mx-auto">
        {children}
    </div>
}