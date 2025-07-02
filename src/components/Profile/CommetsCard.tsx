import { useEffect, useState, useRef } from "react";
import { getUserComments } from "@/services/User/getUserComments";
import type { CommentResponseDto } from "@/interfaces/Comment/CommentResponseDto";
import "@/styles/CommetsCard.css";
import { useInView } from "@/hooks/useInView";

const PAGE_SIZE = 4;

const CommetsCard = () => {
  const [comments, setComments] = useState<CommentResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [ref, inView] = useInView<HTMLDivElement>();
  const [showEmpty, setShowEmpty] = useState(true);
  const [hideEmpty, setHideEmpty] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getUserComments(0, 50)
      .then((res) => setComments(res.content || []))
      .catch(() => setError("No se pudieron cargar tus comentarios"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (comments.length && showEmpty) {
      setHideEmpty(true);
      hideTimeout.current = setTimeout(() => setShowEmpty(false), 600);
    }
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [comments, showEmpty]);

  if (loading) return <div className="comments-loading">Cargando...</div>;
  if (error) return <div className="comments-error">No se pudieron cargar tus comentarios</div>;
  if (!comments.length && showEmpty) return (
    <div
      ref={ref}
      className={`owner-restaurants-empty${inView ? " animate" : ""}${hideEmpty ? " hide" : ""}`}
    >
      <p className="owner-restaurants-question">¿Aún no has comentado?</p>
      <button className="owner-restaurants-register-btn" onClick={() => window.location.href = '/dashboard'}>
        Comenta en un restaurante
      </button>
    </div>
  );

  // Distribución 2x2
  const visibleComments = comments.slice(0, showCount);
  const rows = [];
  for (let i = 0; i < visibleComments.length; i += 2) {
    rows.push(visibleComments.slice(i, i + 2));
  }

  return (
    <section className="comments-section">
      {rows.map((row, idx) => (
        <div key={idx} className="comments-row">
          {row.map((comment) => (
            <div key={comment.id} className="comments-card">
              <div className="comments-card-title">{comment.content}</div>
              <div className="comments-card-date">{new Date(comment.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      ))}
      {showCount < comments.length && (
        <button
          className="comments-loadmore"
          onClick={() => setShowCount((c) => c + PAGE_SIZE)}
        >
          Cargar más
        </button>
      )}
    </section>
  );
};

export default CommetsCard;
