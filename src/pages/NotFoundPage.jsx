import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
const NotFoundPage = () => {
    return (
        <section
            style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",   // thay cho justify-content
                alignItems: "center",       // thay cho align-items-center
                height: "24rem"             // h-96 = 24rem
            }}
        >
            <FaExclamationTriangle
                style={{
                    color: "#facc15",  // text-yellow-400
                    fontSize: "3.75rem", // text-6xl ~ 3.75rem
                    marginBottom: "1rem"
                }}
            />
            <h1
                style={{
                    fontSize: "3.75rem", // text-6xl
                    fontWeight: "bold",
                    marginBottom: "1rem"
                }}
            >
                404
            </h1>
            <p
                style={{
                    fontSize: "1.25rem", // text-xl
                    marginBottom: "1.25rem"
                }}
            >
                This page does not exist
            </p>
            <Link
                to="/"
                style={{
                    color: "#fff",
                    backgroundColor: "#4338ca", // bg-indigo-700
                    borderRadius: "0.375rem",   // rounded-md
                    padding: "0.5rem 0.75rem",  // px-3 py-2
                    marginTop: "1rem",
                    textDecoration: "none"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#312e81")} // hover:bg-indigo-900
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
            >
                Go Back
            </Link>
        </section>

    )
}

export default NotFoundPage
