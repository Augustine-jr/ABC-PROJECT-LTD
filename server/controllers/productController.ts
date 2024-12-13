import { Request, Response } from 'express';
import Product from '../models/productModel';
import { SortOrder } from 'mongoose';

interface QueryType {
  price?: {
    $gte?: number;
    $lte?: number;
  };
  category?: {
    $in: string[];
  };
}

interface SortOptionType {
  [key: string]: SortOrder;
}

// Get all products with filtering and sorting
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice, categories, sort } = req.query;
    let query: QueryType = {};

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (categories) {
      query.category = { 
        $in: typeof categories === 'string' ? categories.split(',') : categories as string[] 
      };
    }

    let sortOption: SortOptionType = {};
    if (sort === 'low-high') sortOption.price = 1;
    else if (sort === 'high-low') sortOption.price = -1;

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (err: unknown) {
    res.status(500).json({ 
      message: err instanceof Error ? err.message : 'An unknown error occurred' 
    });
  }
};

// Get a single product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err: unknown) {
    res.status(500).json({ 
      message: err instanceof Error ? err.message : 'An unknown error occurred' 
    });
  }
};

// Add a new product
export const createProduct = async (req: Request, res: Response) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err: unknown) {
    res.status(400).json({ 
      message: err instanceof Error ? err.message : 'An unknown error occurred' 
    });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err: unknown) {
    res.status(400).json({ 
      message: err instanceof Error ? err.message : 'An unknown error occurred' 
    });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err: unknown) {
    res.status(500).json({ 
      message: err instanceof Error ? err.message : 'An unknown error occurred' 
    });
  }
};
