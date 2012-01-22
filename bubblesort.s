addi $16, $0, 4	# $s0 holds the starting address of the array
lw $17, 0($0)	# $s1 holds the number of elements in the array
add $18, $0, $0	# $s2 is our loop counter
addi $19, $0, 1		# $s3 is our swapped value
addi $17, $17, -1		# For our loop, we want to increment to (n - 1)
sll $17, $17, 2			# Convert (n - 1) to bytes
OuterLoop:
	beq $19, $0, Exit		# If we didn't perform a swap previously, exit
	add $19, $0, $0	# clear the swapped boolean
	addi $18, $0, 0		# set up the inner loop counter
InnerLoop:
	add $18, $18, 4			# increment the loop counter (in bytes)
	blt $17, $18  OuterLoop	# If we have incremented past the number of elements, go back to OuterLoop
	add $8, $16, $18		# add our loop value to the base address of the array
	lw $9, -4($8)			# $t1 = arr[i - 1]
	lw $10, 0($8)			# $t1 = arr[i]
	blt $9, $10, InnerLoop	# If arr[i] < arr[i - 1], go to beginning of loop
	sw $10, -4($8)			# Store arr[i - 1] in arr[i]
	sw $9, 0($8)			# Store arr[i] in arr[i - 1]
	addi $19, $0, 1		# Set the swapped boolean value, indicating we performed a swap
	j InnerLoop			# Jump back to the top of innner loop
Exit: