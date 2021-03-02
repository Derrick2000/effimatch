package com.referral.dao.impl;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.referral.dao.ReviewDao;
import com.referral.model.Job;
import com.referral.model.Review;
@Repository
public class ReviewDaoImpl implements ReviewDao{
	
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String KEY = "Review";
    

	@Override
	public LinkedHashSet<Review> getAllReviews() {
        return (LinkedHashSet<Review>) (LinkedHashSet) redisTemplate.opsForZSet().range(KEY, 0,-1);

	}

	@Override
	public Review addReview(Review review) {
		Date now = new Date(System.currentTimeMillis());
		Review reviewToAdd = new Review(review.getUsername(),review.getReferrerEmail(),review.getReviewContent(),now);
		redisTemplate.opsForZSet().add(KEY, reviewToAdd, -now.getTime());
		return null;
	}

	@Override
	public Review findReviewById(UUID id) {
		 LinkedHashSet<Review> list = getAllReviews();
	        return list.stream()
	                .filter(j -> j.getId().equals(id))
	                .findAny()
	                .orElse(null);
	}

	@Override
	public boolean deleteReview(UUID id) {
		var toDelete = findReviewById(id);

        // if remove failed, removed == 0
        Long removed = redisTemplate.opsForZSet().remove(KEY, 1, toDelete);

        return removed != null && removed != 0;
	}

	@Override
	public boolean updateReview(Review review, UUID id) {
		Review newReview = findReviewById(id);
        if (newReview == null) {
            return false;
        }
        newReview.setId(UUID.randomUUID());
        if (review.getReviewContent() != null) {
        	newReview.setReviewContent(review.getReviewContent());
        }
        Date modifiedTime = new Date(System.currentTimeMillis());
        newReview.setDate(modifiedTime);
        if (deleteReview(id) == false) {
            return false;
        }
        redisTemplate.opsForZSet().add(KEY, newReview, -newReview.getDate().getTime());//Score需不需要换掉呢
        return true;
	}

	@Override
	public LinkedHashSet<Review> getAllReferrerReviewsByEmail(String email) {
		 LinkedHashSet<Review> list = getAllReviews();
		 LinkedHashSet<Review> resultList = new LinkedHashSet<>();
		 
		 for(Review r:list) {
			 if(r.getReferrerEmail().equals(email)) {
				 resultList.add(r);
			 }		 
		 }
		 return resultList;
	}


}
