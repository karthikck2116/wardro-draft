import { Boxes, CheckCircle2 } from "lucide-react";

export function CartIncentiveProgress({
  recommendationCount,
}: {
  recommendationCount: number;
}) {
  return (
    <section className="wardro-cart-incentive" aria-label="Cart reassurance">
      <span className="wardro-cart-incentive-icon" aria-hidden="true">
        {recommendationCount ? <Boxes /> : <CheckCircle2 />}
      </span>
      <div>
        <strong>
          {recommendationCount
            ? "Complete your storage setup"
            : "Your selection is ready"}
        </strong>
        <p>
          {recommendationCount
            ? `${recommendationCount} compatible ${
                recommendationCount === 1 ? "add-on" : "add-ons"
              } available for this wardrobe.`
            : "Delivery and installation will be checked using your PIN code."}
        </p>
      </div>
    </section>
  );
}
