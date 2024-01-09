import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { Button, useQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
const clientKey = "test_ck_QbgMGZzorzz0oMebq4lvrl5E1em4";
const customerKey = nanoid();
const selector = "#payment-widget";
export function Payment() {
  const location = useLocation();
  const { paymentUid, paymentName, customerName, amount, customerEmail } =
    location.state;
  console.log(location.state);

  const paymentWidget = usePaymentWidget(clientKey, customerKey);
  // const paymentWidget = usePaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(amount);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginAndLoadWidget = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
        return;
      }
      try {
        // 토큰이 유효한 경우, 결제 위젯 로드
        const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
        if (paymentWidget == null) {
          return;
        }
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          selector,
          price,
          { variantKey: "DEFAULT" },
        );

        paymentWidget.renderAgreement("#agreement", {
          variantKey: "AGREEMENT",
        });
        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
      } catch (error) {
        // 토큰이 유효하지 않거나 로드 중 에러 발생 시 로그인 페이지로 리디렉션
        navigate("/login");
      }
    };

    checkLoginAndLoadWidget();
  }, [navigate]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON,
    );
  }, [price]);
  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-widget" />
        <div id="agreement" />
        <div style={{ paddingLeft: "24px" }}>
          <div className="checkable typography--p">
            <label
              htmlFor="coupon-box"
              className="checkable__label typography--regular"
            >
              <input
                id="coupon-box"
                className="checkable__input"
                type="checkbox"
                aria-checked="true"
                onChange={(event) => {
                  setPrice(
                    event.target.checked ? price - 5_000 : price + 5_000,
                  );
                }}
              />
              <span className="checkable__label-text">5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div>
        <div className="result wrapper">
          <p>총액 {price}원</p>
          <Button
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;
              try {
                await paymentWidget?.requestPayment({
                  orderId: paymentUid,
                  orderName: paymentName,
                  customerName: customerName,
                  customerEmail: customerEmail,
                  successUrl: `${window.location.origin}/success`,
                  failUrl: `${window.location.origin}/fail`,
                });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}

function usePaymentWidget(clientKey, customerKey) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}
export default Payment;
