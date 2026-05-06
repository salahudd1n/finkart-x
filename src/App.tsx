import { useEffect, useRef, useState } from 'react'
import './App.css'

type GoalKey = 'hajj' | 'study' | 'emergency' | 'card'

type GoalState = {
  key: GoalKey
  tab: string
  title: string
  target: string
  numericTarget?: number
  timeline: string
  ability: string
  details: Array<{
    label: string
    value: string
  }>
  amountLabel: string
  amountValue: string
  questions: string[]
  products: string[]
  banks?: string[]
  descriptions: string[]
}

const goals: GoalState[] = [
  {
    key: 'hajj',
    tab: 'Hajj',
    title: 'Hajj',
    target: 'Tk 5,60,000',
    numericTarget: 560000,
    timeline: '3 years',
    ability: 'Tk 12,000',
    details: [
      { label: 'Target amount', value: 'Tk 5,60,000' },
      { label: 'Time left', value: '3 years' },
      { label: 'Can save monthly', value: 'Tk 12,000' },
    ],
    amountLabel: 'Target amount',
    amountValue: 'Tk 5,60,000',
    questions: [
      'When do you want to go?',
      'How much can you save monthly?',
      'Have you already saved some money?',
    ],
    products: [
      'Hajj Monthly Deposit Scheme',
      'Mudaraba Hajj Savings Scheme',
      'Fixed Deposit or Term Deposit',
    ],
    banks: [
      'Islamic Bank Bangladesh PLC',
      'Social Islami Bank PLC',
      'Al-Arafah Islami Bank PLC',
    ],
    descriptions: [
      'Best for planned monthly savings toward Hajj expenses.',
      'Shariah-compliant savings option with profit-sharing.',
      'Useful if you already have a lump sum and want stable returns.',
    ],
  },
  {
    key: 'study',
    tab: 'Education',
    title: 'Education',
    target: 'Tk 18,00,000',
    numericTarget: 1800000,
    timeline: '5 years',
    ability: 'Tk 20,000',
    details: [
      { label: 'Target amount', value: 'Tk 18,00,000' },
      { label: 'Time left', value: '5 years' },
      { label: 'Can save monthly', value: 'Tk 20,000' },
    ],
    amountLabel: 'Target amount',
    amountValue: 'Tk 18,00,000',
    questions: [
      'When will the education cost begin?',
      'How much can you save monthly?',
      'Have you already saved some money?',
    ],
    products: ['Education savings plan', 'Fixed deposit option', 'Education loan support'],
    descriptions: [
      'Good if you want to build the amount over time.',
      'Good if you already have savings.',
      'Good if you may need extra support before admission.',
    ],
  },
  {
    key: 'emergency',
    tab: 'Emergency savings',
    title: 'Emergency savings',
    target: 'Tk 3,00,000',
    numericTarget: 300000,
    timeline: '18 months',
    ability: 'Tk 15,000',
    details: [
      { label: 'Target amount', value: 'Tk 3,00,000' },
      { label: 'Time left', value: '18 months' },
      { label: 'Can save monthly', value: 'Tk 15,000' },
    ],
    amountLabel: 'Target amount',
    amountValue: 'Tk 3,00,000',
    questions: [
      'How soon do you need the money?',
      'How much can you save monthly?',
      'Have you already saved some money?',
    ],
    products: ['Flexible savings account', 'Short-term deposit', 'Credit card backup'],
    descriptions: [
      'Good if you may need the money anytime.',
      'Good if you can keep the money untouched for a while.',
      'Good if savings may not be enough.',
    ],
  },
  {
    key: 'card',
    tab: 'Credit card',
    title: 'Credit card',
    target: 'Low fees and rewards',
    timeline: 'Apply this month',
    ability: 'Tk 60,000 income',
    details: [
      { label: 'Monthly income', value: 'Tk 60,000' },
      { label: 'Main use', value: 'Shopping and bills' },
      { label: 'Priority', value: 'Low fees and rewards' },
    ],
    amountLabel: 'Priority',
    amountValue: 'Low fees and rewards',
    questions: [
      'What will you use the card for?',
      'What is your monthly income?',
      'Do you want rewards or lower fees?',
    ],
    products: ['Cashback card', 'Travel benefit card', 'Low-fee starter card'],
    descriptions: [
      'Good if you spend often on shopping and bills.',
      'Good if you want lounge, travel, or foreign payment benefits.',
      'Good if you want a simple card with lower yearly cost.',
    ],
  },
]

const galleryCards = [
  {
    title: 'Save for education',
    copy: 'Plan for school, university, or study abroad with a clear monthly target.',
    shape: 'featured',
    iconSrc: '/icons/ic_education.svg',
  },
  {
    title: 'Prepare for Hajj or Umrah',
    copy: 'See how much you may need and which products can help you save.',
    shape: 'medium',
    iconSrc: '/icons/ic_hajj.svg',
  },
  {
    title: 'Save for marriage',
    copy: 'Find savings and deposit options based on your target amount.',
    shape: 'medium warm',
    iconSrc: '/icons/ic_marriage.svg',
  },
  {
    title: 'Build emergency savings',
    copy: 'Keep money ready for medical, family, or urgent needs.',
    shape: 'compact',
    iconSrc: '/icons/ic_emergency_fund.svg',
  },
  {
    title: 'Find the right credit card',
    copy: 'Compare fees, benefits, waivers, and eligibility.',
    shape: 'compact ink',
    iconSrc: '/icons/ic_credit%20card.svg',
  },
  {
    title: 'Make savings grow safely',
    copy: 'Compare savings and fixed deposit options in clear amounts.',
    shape: 'compact',
    iconSrc: '/icons/ic_savings.svg',
  },
]

const outcomeCards = [
  {
    title: 'Credit cards',
    copy: 'Compare annual fees, rewards, cashback, and eligibility.',
    snippet: 'Yearly value',
    tags: ['Fees', 'Eligibility', 'Flexibility'],
  },
  {
    title: 'Savings plans',
    copy: 'Compare monthly deposit, maturity value, tenure, and flexibility.',
    snippet: 'Monthly deposit',
    tags: ['Monthly payment', 'Estimated return', 'Risk'],
  },
  {
    title: 'Fixed deposits',
    copy: 'Compare profit rate, tenure, early withdrawal rules, and risk.',
    snippet: 'Maturity amount',
    tags: ['Estimated return', 'Flexibility', 'Risk'],
  },
  {
    title: 'Loans',
    copy: 'Compare EMI, total repayment, processing fee, and approval fit.',
    snippet: 'Total repayment',
    tags: ['Monthly payment', 'Fees', 'Eligibility'],
  },
]

function formatTk(value: number) {
  return `Tk ${new Intl.NumberFormat('en-IN').format(value)}`
}

function useCountUp(value?: number, duration = 1150) {
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (!value) return

    let raf = 0
    let start = 0

    const tick = (time: number) => {
      if (!start) start = time
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAmount(Math.round(value * eased))

      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration, value])

  return amount
}

function useRouteActivation() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { threshold: 0.42 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, active }
}

function GoalIcon({ type }: { type: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  }

  return (
    <svg className="goal-icon" viewBox="0 0 48 48" aria-hidden="true">
      {type === 'education' && (
        <>
          <path {...common} d="M9 17l15-7 15 7-15 7-15-7z" />
          <path {...common} d="M15 21v9c5 4 13 4 18 0v-9" />
          <path {...common} d="M39 17v12" />
        </>
      )}
      {type === 'hajj' && (
        <>
          <path {...common} d="M15 32c-4-5-4-13 1-18 4-4 10-5 15-2-4 1-7 5-7 10 0 6 4 10 10 10-6 4-14 4-19 0z" />
          <path {...common} d="M33 13l1.5 3 3 .5-2.2 2.1.5 3-2.8-1.5-2.8 1.5.5-3-2.2-2.1 3-.5 1.5-3z" />
        </>
      )}
      {type === 'marriage' && (
        <>
          <circle {...common} cx="20" cy="25" r="8" />
          <circle {...common} cx="29" cy="23" r="8" />
          <path {...common} d="M18 13h8l3 6" />
        </>
      )}
      {type === 'emergency' && (
        <>
          <path {...common} d="M24 8l15 8v10c0 9-6 13-15 16C15 39 9 35 9 26V16l15-8z" />
          <path {...common} d="M24 17v14" />
          <path {...common} d="M17 24h14" />
        </>
      )}
      {type === 'card' && (
        <>
          <rect {...common} x="8" y="14" width="32" height="22" rx="4" />
          <path {...common} d="M8 21h32" />
          <path {...common} d="M15 29h9" />
          <path {...common} d="M31 29h3" />
        </>
      )}
      {type === 'growth' && (
        <>
          <path {...common} d="M11 35h26" />
          <path {...common} d="M15 31V19" />
          <path {...common} d="M24 31V13" />
          <path {...common} d="M33 31V22" />
          <path {...common} d="M14 17c6 1 11-1 15-6" />
          <path {...common} d="M29 11h-6" />
          <path {...common} d="M29 11v6" />
        </>
      )}
    </svg>
  )
}

function StepCue({ type }: { type: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  }

  return (
    <svg className="step-cue" viewBox="0 0 42 42" aria-hidden="true">
      {type === 'goal' && (
        <>
          <circle {...common} cx="21" cy="21" r="12" />
          <circle {...common} cx="21" cy="21" r="5" />
          <path {...common} d="M21 4v5M21 33v5M4 21h5M33 21h5" />
        </>
      )}
      {type === 'questions' && (
        <>
          <path {...common} d="M12 11h18a4 4 0 014 4v10a4 4 0 01-4 4H19l-7 5v-5a4 4 0 01-4-4V15a4 4 0 014-4z" />
          <path {...common} d="M17 18h9M17 24h6" />
        </>
      )}
      {type === 'products' && (
        <>
          <rect {...common} x="9" y="10" width="24" height="22" rx="4" />
          <path {...common} d="M15 17h12M15 22h12M15 27h7" />
          <path {...common} d="M30 7v6M27 10h6" />
        </>
      )}
    </svg>
  )
}

function RouteMap({
  selected,
  onSelect,
}: {
  selected: GoalState
  onSelect: (goal: GoalState) => void
}) {
  const activeGoal = goals.find((goal) => goal.key === selected.key) ?? goals[0]
  const counted = useCountUp(activeGoal.numericTarget)
  const amount = activeGoal.numericTarget ? formatTk(counted) : activeGoal.amountValue

  return (
    <div className="route-stage" aria-label="Your product match">
      <div className="route-tabs" role="tablist" aria-label="Goal options">
        {goals.map((goal) => (
          <button
            aria-selected={goal.key === activeGoal.key}
            className={goal.key === activeGoal.key ? 'route-tab active' : 'route-tab'}
            key={goal.key}
            onClick={() => onSelect(goal)}
            role="tab"
            type="button"
          >
            {goal.tab}
          </button>
        ))}
      </div>

      <div className="route-canvas" key={activeGoal.key}>
        <svg className="route-lines" viewBox="0 0 940 620" aria-hidden="true">
          <path
            className="route-line main"
            d="M126 254 C232 146 318 138 398 212 C482 290 528 322 612 254 C666 210 698 170 746 152"
          />
          <path className="route-line branch branch-one" d="M746 152 C760 278 786 338 828 374" />
          <path className="route-line action" d="M548 562 C642 558 706 486 742 426 C762 394 786 378 828 374" />
        </svg>

        <article className="start-node map-node">
          <span className="node-kicker">Selected goal</span>
          <h3>{activeGoal.title}</h3>
          <dl>
            {activeGoal.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <div className="checkpoint cp-one">
          <span>1</span>
          {activeGoal.questions[0]}
        </div>
        <div className="checkpoint cp-two">
          <span>2</span>
          {activeGoal.questions[1]}
        </div>
        <div className="checkpoint cp-three">
          <span>3</span>
          {activeGoal.questions[2]}
        </div>

        <article className="amount-marker">
          <span>{activeGoal.amountLabel}</span>
          <strong>{amount}</strong>
        </article>

        <article className="next-action">
          <span>Matched product</span>
          <strong>{activeGoal.products[0]}</strong>
          <p>{activeGoal.descriptions[0]}</p>
        </article>
      </div>
    </div>
  )
}

function App() {
  const [selectedGoal, setSelectedGoal] = useState(goals[0])
  const { ref: logicRef, active } = useRouteActivation()
  const previewAmount = useCountUp(560000, 1300)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSelectedGoal((currentGoal) => {
        const currentIndex = goals.findIndex((goal) => goal.key === currentGoal.key)
        return goals[(currentIndex + 1) % goals.length]
      })
    }, 9500)

    return () => window.clearTimeout(timer)
  }, [selectedGoal.key])

  return (
    <main>
      <section className="hero-route section" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="Primary">
          <a className="brand" href="#top">
            <img
              className="brand-logo"
              src="/logo_finkart_by_sslcommerz.svg"
              alt="Finkart"
              height={38}
              width={81}
            />
          </a>
          <div className="topbar-links">
            <a href="#goals">Goals</a>
            <a href="#logic">How it works</a>
            <a href="#compare">Compare</a>
          </div>
        </nav>

        <div className="hero-layout" id="top">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span>Find the right financial</span>
              <span>product for your goal</span>
            </h1>
            <p className="hero-subtitle">
              Choose a goal like Hajj, education, emergency savings, or a credit
              card. Answer 3 simple questions and compare products that fit your
              income, timeline, and needs.
            </p>
            <div className="hero-actions">
              <a className="primary-cta" href="#goals">
                Start with 3 questions
              </a>
              <a className="secondary-cta" href="#compare">
                Compare products
              </a>
            </div>
            <ul className="trust-notes">
              <li>No banking terms needed</li>
              <li>Compare in clear amounts</li>
              <li>Fees and conditions explained</li>
            </ul>
          </div>

          <RouteMap selected={selectedGoal} onSelect={setSelectedGoal} />
        </div>
      </section>

      <section className="goal-gallery section" id="goals">
        <div className="gallery-intro">
          <h2>Start with your goal</h2>
          <p>
            Pick what you need. We’ll show suitable savings, deposit, card, or
            loan products in simple language.
          </p>
        </div>
        <div className="gallery-grid">
          {galleryCards.map((card) => (
            <article className={`goal-tile ${card.shape}`} key={card.title}>
              <img className="product-icon" src={card.iconSrc} alt="" aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <a href="#preview">See products</a>
            </article>
          ))}
        </div>
      </section>

      <section className="matching-logic section" id="logic" ref={logicRef}>
        <div className="logic-copy">
          <h2>See suitable products in less than a minute</h2>
          <p>
            Start with a few simple answers. Add more details later if you want
            a closer match.
          </p>
        </div>
        <div className={active ? 'logic-route active' : 'logic-route'}>
          {[
            ['Pick a goal', 'Tell us what you need.', 'goal'],
            ['Answer 3 questions', 'Share your timeline, savings amount, and current situation.', 'questions'],
            ['Compare suitable products', 'See products by fit, cost, fees, and conditions.', 'products'],
          ].map(([title, copy, cue]) => (
            <article className="logic-node" key={title}>
              <span>
                <StepCue type={cue} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="result-preview section" id="preview">
        <div className="result-shell">
          <div className="result-copy">
            <h2>See matched products before you apply</h2>
            <p>
              We explain the options in simple terms: how much you may need, how
              much to save monthly, what the product offers, and what conditions
              to check.
            </p>
          </div>

          <div className="result-module">
            <article className="summary-panel">
              <span>Matched products</span>
              <h3>Saadiq Hajj Savers Account</h3>
              <p className="summary-bank">Standard Chartered Bangladesh</p>
              <div className="summary-amount">
                <small>Target amount</small>
                <strong>{formatTk(previewAmount)}</strong>
              </div>
              <dl>
                <div>
                  <dt>Time left</dt>
                  <dd>3 years</dd>
                </div>
                <div>
                  <dt>Can save monthly</dt>
                  <dd>Tk 12,000/month</dd>
                </div>
              </dl>
            </article>
            <div className="route-panel">
              <span className="route-panel-title">Alternative matches</span>
              {goals[0].products.map((product, index) => (
                <article className="financial-route" key={product}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{product}</h3>
                    <p className="summary-bank">{goals[0].banks?.[index]}</p>
                    <p>{goals[0].descriptions[index]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="outcomes section" id="compare">
        <div className="outcome-heading">
          <h2>Compare what you pay, save, or receive</h2>
          <p>See the details that matter before choosing or applying.</p>
        </div>
        <div className="outcome-strip">
          {outcomeCards.map((card) => (
            <article className="outcome-card" key={card.title}>
              <span className="snippet">{card.snippet}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <div>
                {card.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-route section" aria-labelledby="final-title">
        <div className="final-copy">
          <h2 id="final-title">Find the right financial product for your goal</h2>
          <div className="hero-actions">
            <a className="primary-cta" href="#goals">
              Start with 3 questions
            </a>
            <a className="secondary-cta" href="#compare">
              Browse all products
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <img
                className="brand-logo"
                src="/logo_finkart_by_sslcommerz.svg"
                alt="Finkart"
                height={38}
                width={81}
              />
            </a>
            <p>
              Find suitable financial products based on your goal, income, and
              timeline.
            </p>
          </div>

          <nav className="footer-column" aria-label="Product">
            <h3>Product</h3>
            <a href="#goals">Goal matching</a>
            <a href="#logic">How it works</a>
            <a href="#preview">Matched products</a>
            <a href="#compare">Compare products</a>
          </nav>

          <nav className="footer-column" aria-label="Goals">
            <h3>Goals</h3>
            <a href="#goals">Hajj and Umrah</a>
            <a href="#goals">Education</a>
            <a href="#goals">Emergency savings</a>
            <a href="#goals">Credit cards</a>
          </nav>

          <nav className="footer-column" aria-label="Company">
            <h3>Company</h3>
            <a href="#top">About Finkart</a>
            <a href="#top">Contact</a>
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Finkart. All rights reserved.</p>
          <p>
            Product information, fees, and eligibility should be checked before
            applying.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
