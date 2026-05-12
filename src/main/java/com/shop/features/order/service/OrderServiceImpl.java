package com.shop.features.order.service;

import java.math.BigDecimal;
import java.util.List;

import com.shop.common.exception.BadRequestException;
import com.shop.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.shop.common.exception.ResourceNotFoundException;
import com.shop.features.cart.entity.Cart;
import com.shop.features.cart.entity.CartItem;
import com.shop.features.cart.repository.CartRepository;
import com.shop.features.order.dto.OrderResponseDto;
import com.shop.features.order.entity.Order;
import com.shop.features.order.entity.OrderItem;
import com.shop.features.order.mapper.OrderMapper;
import com.shop.features.order.repository.OrderRepository;
import com.shop.features.product.entity.Product;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
		
	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final OrderRepository orderRepository;
	
		@Override
		@Transactional
		public OrderResponseDto placeOrder(String email) {
			User user = userRepository.findByEmail(email)
					.orElseThrow(()->new ResourceNotFoundException("User not found"));
			Cart cart = cartRepository.findByUserId(user.getId())
					.orElseThrow(()->new ResourceNotFoundException("Cart not found"));
			
			 if (cart.getItems().isEmpty()) {
		            throw new BadRequestException("Cart is empty");
		        }
			 
			 // create order 
			 
			 Order order = new Order();
			 order.setUser(user);
			 order.setStatus("Placed");
			 
			 BigDecimal total = BigDecimal.ZERO;
			 
			 // cart-> order items
			 
			 for(CartItem cartItem : cart.getItems()) {

				    Product product = cartItem.getProduct();

				    if(product.getStock() < cartItem.getQuantity()) {
				        throw new BadRequestException(
				            "Insufficient stock for product: " + product.getName()
				        );
				    }

				    product.setStock(product.getStock() - cartItem.getQuantity());

				    OrderItem orderItem = new OrderItem();

				    orderItem.setOrder(order);

				    orderItem.setProduct(product);

				    orderItem.setQuantity(cartItem.getQuantity());

				    orderItem.setPrice(cartItem.getPrice()); // IMPORTANT

				    order.getItems().add(orderItem);

				    total = total.add(
				        cartItem.getPrice().multiply(
				            BigDecimal.valueOf(cartItem.getQuantity())
				        )
				    );
				} 
		            
		            // final order 
		            
		            order.setTotalPrice(total);
		            
		            // save order
		            
		            Order saveOrder= orderRepository.save(order);
		            
		            // clear cart 
		            
		            cart.getItems().clear();
		            
		            cartRepository.save(cart);
		            return OrderMapper.toResponseDto(saveOrder);
			 }
			 
			 public List<OrderResponseDto>getMyOrders(String email){
				 User user = userRepository.findByEmail(email)
						 .orElseThrow(()-> new ResourceNotFoundException("User not found"));
				 
				 return orderRepository.findByUserId(user.getId())
						 .stream()
						 .map(OrderMapper::toResponseDto)
						 .toList();
			 }
		}