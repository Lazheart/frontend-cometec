import { useEffect, useState, useRef } from "react";
import { getUserReviews } from "@/services/User/getUserReviews";
import type { ReviewResponseDto } from "@/interfaces/Review/ReviewResponseDto";
import "@/styles/ReviewsCard.css";
import { useInView } from "@/hooks/useInView";

const PAGE_SIZE = 4;

const ReviewsCard = () => {
  const [reviews, setReviews] = useState<ReviewResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [ref, inView] = useInView<HTMLDivElement>();
  const [showEmpty, setShowEmpty] = useState(true);
  const [hideEmpty, setHideEmpty] = useState(false);
  const [showAnimate, setShowAnimate] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getUserReviews(0, 50)
      .then((res) => setReviews(res.content || []))
      .catch(() => setError("No se pudieron cargar tus reseñas"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (reviews.length && showEmpty) {
      setHideEmpty(true);
      hideTimeout.current = setTimeout(() => setShowEmpty(false), 600);
    }
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [reviews, showEmpty]);

  useEffect(() => {
    if (inView && !showAnimate && !hideEmpty && showEmpty) {
      // Espera un tick para asegurar el render antes de animar
      setTimeout(() => setShowAnimate(true), 10);
    }
  }, [inView, showAnimate, hideEmpty, showEmpty]);

  if (loading) return <div className="reviews-loading">Cargando...</div>;
  if (error) return <div className="reviews-error">No se pudieron cargar tus reseñas</div>;
  if (!reviews.length && showEmpty) return (
    <div
      ref={ref}
      className={`owner-restaurants-empty${showAnimate ? " animate" : ""}${hideEmpty ? " hide" : ""}`}
    >
      <p className="owner-restaurants-question">¿Aún no has dejado reseñas?</p>
      <button className="owner-restaurants-register-btn" onClick={() => window.location.href = '/dashboard'}>
        Escribe una reseña
      </button>
    </div>
  );

  // Distribución 2x2
  const visibleReviews = reviews.slice(0, showCount);
  const rows = [];
  for (let i = 0; i < visibleReviews.length; i += 2) {
    rows.push(visibleReviews.slice(i, i + 2));
  }

  return (
    <section className="reviews-section">
      {rows.map((row, idx) => (
        <div key={idx} className="reviews-row">
          {row.map((review) => (
            <div key={review.id} className="reviews-card reviews-card-animate">
              <div className="reviews-card-title">{review.content}</div>
              <div className="reviews-card-rating">Calificación: <span className="font-semibold">{review.rating}</span></div>
              <div className="reviews-card-date">{new Date(review.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      ))}
      {showCount < reviews.length && (
        <button
          className="reviews-loadmore"
          onClick={() => setShowCount((c) => c + PAGE_SIZE)}
        >
          Cargar más
        </button>
      )}
    </section>
  );
};

export default ReviewsCard;
