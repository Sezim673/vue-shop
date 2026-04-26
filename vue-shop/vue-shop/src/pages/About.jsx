import { useTranslation } from 'react-i18next';
import { Heart, Users, Award, TrendingUp } from 'lucide-react';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  
  const stats = [
    { icon: <Heart size={28} />, value: '50K+', label: 'Happy Customers', labelRu: 'Довольных клиентов' },
    { icon: <Users size={28} />, value: '100+', label: 'Brands', labelRu: 'Брендов' },
    { icon: <Award size={28} />, value: '5K+', label: 'Products', labelRu: 'Товаров' },
    { icon: <TrendingUp size={28} />, value: '99%', label: 'Satisfaction', labelRu: 'Довольных' },
  ];
  
  const team = [
    {
      name: 'Anna Smith',
      role: 'Founder & CEO',
      roleRu: 'Основатель и CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
    },
    {
      name: 'Maria Garcia',
      role: 'Creative Director',
      roleRu: 'Креативный директор',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop'
    },
    {
      name: 'Elena Petrova',
      role: 'Head of Marketing',
      roleRu: 'Руководитель маркетинга',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
    },
  ];
  
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>{t('footer.about')} VueShop</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, VueShop began with a simple mission: to make premium beauty 
                products accessible to everyone. We believe that every woman deserves to feel 
                confident and beautiful, regardless of her budget.
              </p>
              <p>
                Our curated collection features over 100 brands from around the world, 
                carefully selected to ensure quality, authenticity, and effectiveness. 
                From luxury favorites to affordable gems, we have something for every beauty lover.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1522335789204-aabd1fc54bc9?w=600&h=400&fit=crop"
                alt="Beauty Products"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">
                  {t('common.language') === 'ru' ? stat.labelRu : stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🌿</span>
              <h3>Cruelty-Free</h3>
              <p>We only work with brands that share our commitment to ethical beauty.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">✨</span>
              <h3>Quality First</h3>
              <p>Every product in our collection is carefully vetted for quality and effectiveness.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">💜</span>
              <h3>Customer Love</h3>
              <p>Your satisfaction is our priority. We're here to help you find your perfect match.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🌍</span>
              <h3>Sustainability</h3>
              <p>We're committed to reducing our environmental impact through eco-friendly practices.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} className="team-image" />
                <h3>{member.name}</h3>
                <p>{t('common.language') === 'ru' ? member.roleRu : member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;