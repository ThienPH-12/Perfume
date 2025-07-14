package com.example.Perfume.api.controller;

import com.example.Perfume.api.bean.req.OrderReq;
import com.example.Perfume.jpa.entity.TransactionRecord;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.service.OrderService;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.time.Instant;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;
import vn.payos.type.PaymentLinkData;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final PayOS payOS;

    @Autowired
    private OrderService recordService;

    public OrderController(PayOS payOS) {
        super();
        this.payOS = payOS;
    }

    @PostMapping(path = "/createPayment")
    public ObjectNode createPaymentLink(@RequestBody OrderReq requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            final List<ItemData> items = requestBody.getItems();
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            // Gen order code
            String currentTimeString = String.valueOf(new Date().getTime());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));

            Integer id = null;

            // Set expiration time to current date plus 10 minutes using Instant
            long expiredAt = Instant.now().plusSeconds(10 * 60).getEpochSecond();

            PaymentData.PaymentDataBuilder builder = PaymentData.builder()
                    .orderCode(orderCode)
                    .description(requestBody.getDescription())
                    .amount(requestBody.getPrice())
                    .items(items)
                    .returnUrl(requestBody.getReturnUrl())
                    .cancelUrl(requestBody.getCancelUrl())
                    .buyerName(requestBody.getBuyerName())
                    .buyerEmail(requestBody.getBuyerEmail())
                    .buyerPhone(requestBody.getBuyerPhone())
                    .buyerAddress(requestBody.getBuyerAddress());

            if ("anonymousUser".equals(authentication.getPrincipal())) {
                builder.expiredAt(expiredAt); // Only add expiredAt for anonymous users
            }

            PaymentData paymentData = builder.build();
            CheckoutResponseData data = payOS.createPaymentLink(paymentData);
            if (authentication.getPrincipal() != "anonymousUser") {
                User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                id = userContext.getUserId();
                recordService.addOrder(orderCode,id,data.getCheckoutUrl(),items);
            }
            response.put("error", 0);
            response.put("message", "tạo đơn thành công!");
            response.set("data", objectMapper.valueToTree(data));
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;

        }
    }

    @GetMapping(path = "/order/{orderId}")
    public ObjectNode getOrderById(@PathVariable("orderId") long orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        try {
            PaymentLinkData order = payOS.getPaymentLinkInformation(orderId);

            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }

    }

    @PutMapping(path = "/order/{orderId}")
    public ObjectNode cancelOrder(@PathVariable("orderId") int orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            PaymentLinkData order = payOS.cancelPaymentLink(orderId, null);
            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }

    @PostMapping(path = "/confirm-webhook")
    public ObjectNode confirmWebhook(@RequestBody Map<String, String> requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            String str = payOS.confirmWebhook(requestBody.get("webhookUrl"));
            response.set("data", objectMapper.valueToTree(str));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }

    @GetMapping(path = "/orders")
    public ResponseEntity<List<TransactionRecord>> getOrderByUserId() {
        // Logic here
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int id = userContext.getUserId();
        List<TransactionRecord> list = recordService.getUserOrders(id);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping(path = "/order/{orderId}")
    public ObjectNode deleteOrder(@PathVariable("orderId") long orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            // Logic to delete order
            response.put("error", 0);
            response.put("message", "Order deleted successfully");
            response.set("data", null);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }
}
