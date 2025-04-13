import { useState, useEffect, useRef } from 'react'
import './App.css'

const content = [
  [
    "Desenvolvimento de aplicações desktop",
    "Programação Orientada a Objetos",
    "Spring Framework",
    "JUnit para testes"
  ],
  [
    "Modelagem de banco de dados",
    "Consultas complexas",
    "Normalização",
    "MySQL e PostgreSQL"
  ],
  [
    "Programação estruturada",
    "Estruturas de dados",
    "Algoritmos",
    "Programação de baixo nível"
  ]
];

function BullsAndCows() {
  const [secretNumber, setSecretNumber] = useState('');
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Gera um número secreto de 4 dígitos sem repetição
    const generateSecretNumber = () => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let secret = '';
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        secret += numbers[randomIndex];
        numbers.splice(randomIndex, 1);
      }
      setSecretNumber(secret);
    };

    generateSecretNumber();
  }, []);

  const handleGuess = () => {
    if (guess.length !== 4 || !/^\d+$/.test(guess)) {
      setMessage('Por favor, insira um número de 4 dígitos válido');
      return;
    }

    let bulls = 0;
    let cows = 0;

    // Conta bulls (dígitos corretos na posição correta)
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secretNumber[i]) {
        bulls++;
      }
    }
    for (let i = 0; i < 4; i++) {
      if (secretNumber.includes(guess[i]) && guess[i] !== secretNumber[i]) {
        cows++;
      }
    }

    const newHistory = [...history, { guess, bulls, cows }];
    setHistory(newHistory);

    if (bulls === 4) {
      setMessage('Parabéns! Você venceu!');
      setGameOver(true);
    } else {
      setMessage(`${bulls} Bulls, ${cows} Cows`);
    }

    setGuess('');
  };

  const resetGame = () => {
    setSecretNumber('');
    setGuess('');
    setHistory([]);
    setMessage('');
    setGameOver(false);
    // Gera novo número secreto
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let secret = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      secret += numbers[randomIndex];
      numbers.splice(randomIndex, 1);
    }
    setSecretNumber(secret);
  };
  
  const handleGiveUp = () => {
    setMessage(`Você desistiu! O número secreto era ${secretNumber}`);
    setGameOver(true);
  };
  
  return (
    <div className="game-container">
      <h2>Bulls and Cows</h2>
      <p className="game-instructions">
        Tente adivinhar o número secreto de 4 dígitos sem repetição.<br />
        Bulls: dígitos corretos na posição correta<br />
        Cows: dígitos corretos na posição errada
      </p>
      
      <div className="game-input">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Digite um número de 4 dígitos"
          maxLength="4"
          disabled={gameOver}
        />
        <button onClick={handleGuess} disabled={gameOver}>
          Tentar
        </button>
      </div>

      {message && <p className="game-message">{message}</p>}

      <div className="game-history">
        <h3>Histórico de Tentativas</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              Tentativa {index + 1}: {item.guess} - {item.bulls} Bulls, {item.cows} Cows
            </li>
          ))}
        </ul>
      </div>

      {gameOver && (
        <button className="reset-button" onClick={resetGame}>
          Jogar Novamente
        </button>
      )}
    </div>
  );
}

function App() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Botão voltar ao topo
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <nav>
          <ul>
            <li><a onClick={() => scrollToSection('inicio')} href="#inicio">Início</a></li>
            <li><a onClick={() => scrollToSection('sobre')} href="#sobre">Sobre</a></li>
            <li><a onClick={() => scrollToSection('habilidades')} href="#habilidades">Habilidades</a></li>
            <li><a onClick={() => scrollToSection('jogo')} href="#jogo">Jogo</a></li>
            <li><a onClick={() => scrollToSection('contatos')} href="#contatos">Contatos</a></li>
          </ul>
        </nav>
      </header>

      <section className="profile-section" ref={el => sectionsRef.current[0] = el} id="inicio">
        <img src="/userp.png" alt="Gabriel Martins de Souza" className="profile-image" />
        <h1 className="profile-name">Olá, eu sou Gabriel Martins de Souza</h1>
        <p className="profile-title">Estudante de ciência da computação</p>
      </section>

      <section className="about-section" ref={el => sectionsRef.current[1] = el} id="sobre">
        <h2 className="section-title">Sobre</h2>
        <div className="about-content">
          <p>Sou morador de Olinda bairrista que adora uma broa de milho. Estudo na Universidade de Pernambuco desde 2023.1 e tenho previsão de terminar o curso em 2027.2. Gosto de Banco de dados e Java</p>
        </div>
      </section>

      <section className="skills-section" ref={el => sectionsRef.current[2] = el} id="habilidades">
        <h2 className="section-title">Habilidades</h2>
        <div id="tabs">
          <menu>
            <button
              className={activeContentIndex === 0 ? "active" : ""}
              onClick={() => setActiveContentIndex(0)}
            >
              <img src="/logoJava.png" alt="Java Logo" className="skill-logo" />
              Java
            </button>
            <button
              className={activeContentIndex === 1 ? "active" : ""}
              onClick={() => setActiveContentIndex(1)}
            >
              <img src="/logoSQL.png" alt="SQL Logo" className="skill-logo" />
              SQL
            </button>
            <button
              className={activeContentIndex === 2 ? "active" : ""}
              onClick={() => setActiveContentIndex(2)}
            >
              <img src="/logoC.png" alt="C Logo" className="skill-logo" />
              C
            </button>
          </menu>
          <div id="tab-content">
            <ul>
              {content[activeContentIndex].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="game-section" ref={el => sectionsRef.current[3] = el} id="jogo">
        <h2 className="section-title">Jogo Bulls and Cows</h2>
        <BullsAndCows />
      </section>

      <section className="contact-section" ref={el => sectionsRef.current[4] = el} id="contatos">
        <h2 className="section-title">Contato</h2>
        <div className="contact-content">
          <a href="mailto:amartinsame@gmail.com" className="contact-link">
            amartinsame@gmail.com
          </a>
        </div>
      </section>

      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          subir
        </button>
      )}
    </div>
  )
}

export default App
