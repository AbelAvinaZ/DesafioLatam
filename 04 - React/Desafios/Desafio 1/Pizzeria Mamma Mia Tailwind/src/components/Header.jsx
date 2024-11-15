import "../assets/css/Header.css"


export default function Header() {
    return (
        <header>
            <div className="absolute inset-0 bg-black/60 h-full flex flex-col items-center justify-center text-white px-10">
                    <div className="border-b border-white mx-auto max-w-4xl w-full text-center">
                        <h1 className="text-4xl font-bold mb-4">¡Pizzería Mamma Mia!</h1>
                        <p className="text-xl mb-4">¡Tenemos las mejores pizzas que podrás encontrar!</p>
                    </div>
            </div>
        </header>
    )
}