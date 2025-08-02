import React, { useState, useRef, useEffect } from "react";
import { verifyController } from "../../controllers/LoginController/verifyController";
import { useNavigate } from "react-router-dom";
import "../../styles/loginStyles/Verify.css";

const VerificarCodigo: React.FC = () => {
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (codigo.every((num) => num !== "")) {
            const token = localStorage.getItem("token");
            if (!token) return alert("Você precisa estar logado.");

            const codigoFinal = codigo.join("");
            verifyController(codigoFinal, token)
                .then((res) => {
                    if (res.verificado) {
                        setTimeout(() => {
                            navigate("/home");
                        }, 600);
                    } else {
                        alert(res.error || "Código incorreto.");
                        setCodigo(Array(6).fill(""));
                        inputsRef.current[0]?.focus();
                    }
                })
                .catch((err) => {
                    alert(err.message);
                    setCodigo(Array(6).fill(""));
                    inputsRef.current[0]?.focus();
                });
        }
    }, [codigo, navigate]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCodigo = [...codigo];
        newCodigo[index] = value;
        setCodigo(newCodigo);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !codigo[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="verificar-container">
            <div className="verificar-box">
                <h2>Digite o código de 6 dígitos</h2>
                <div className="codigo-inputs">
                    {codigo.map((num, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            value={num}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            ref={(el) => {inputsRef.current[i] = el}}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerificarCodigo;
